from pydantic import BaseModel
from typing import List

class Project(BaseModel):
    title: str
    description: str
    technologies: List[str]

class Education(BaseModel):
    college: str
    degree: str
    year: str

class Portfolio(BaseModel):
    user_email: str
    bio: str
    skills: List[str]
    projects: List[Project]
    education: List[Education]