export interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

export interface ProjectTechnology {
  name: string;
  Image: string;
  width: number;
  height: number;
}

export interface ProjectCloudProvider {
  name: string;
  Image: string;
  width: number;
  height: number;
}

export interface Planet {
  id: string;
  name: string;
  link?: string;
  description: string;
  remark: string;
  images: ProjectImage[];
  frameworks: ProjectTechnology[];
  cloud: ProjectCloudProvider[];
}

export type Project = Planet;
