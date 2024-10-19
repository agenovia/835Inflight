from dataclasses import dataclass, field
from os import DirEntry, scandir
from typing import Dict, List

from cachetools import TTLCache, cached
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
staging_dir = r"\\niv\prod$\Repository\EDI\PROD\Outbound\835"
tp5010_dir = r"\\qprodconn\TP5010_835_output"
archive_dir = r"\\niv\prod$\Repository\EDI\PROD\Outbound\Archive\835"


@dataclass
class File:
    entry: DirEntry
    details: dict = field(init=False)

    def __post_init__(self):
        stat = self.entry.stat(follow_symlinks=False)
        self.details = {
            "fullPath": self.entry.path,
            "fileName": self.entry.name,
            "fileFolder": str(self.entry.path).split("\\")[-2],
            "stat": {
                "created": stat.st_birthtime,
                "modified": stat.st_mtime,
            },
        }

    def to_json(self):
        """Convert to JSON for transmitting"""
        return self.details

    def is_file(self):
        """Return True if file is a file"""
        return self.entry.is_file()


def scan(path: str, recursive: bool = True):
    """Recursively scan"""
    files = []
    for file in scandir(path):
        if file.is_file(follow_symlinks=False):
            files.append(File(file))
        else:
            files.append(File(file))
            if recursive:
                files.extend(scan(file.path))
    return files


@app.get("/inflight")
@cached(cache=TTLCache(maxsize=1024, ttl=900))
def get_inflight_files() -> List[Dict]:
    """Get in-flight 835 files"""
    return [entry.to_json() for entry in scan(staging_dir) if entry.is_file()]


@app.get("/ready")
@cached(cache=TTLCache(maxsize=1024, ttl=900))
def get_ready_files() -> List[Dict]:
    """Ready is the subset of files currently waiting in TP_5010 Output"""
    return [entry.to_json() for entry in scan(tp5010_dir) if entry.is_file()]


@app.get("/archived")
@cached(cache=TTLCache(maxsize=1024, ttl=900))
def get_archived_files() -> List[Dict]:
    """Ready is the subset of files currently waiting in TP_5010 Output"""
    return [entry.to_json() for entry in scan(archive_dir, recursive=False)]
