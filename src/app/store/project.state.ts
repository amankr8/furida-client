import { Project } from '../interface/project';

export interface ProjectState {
  projects: Project[];
  isLoaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialProjectsState: ProjectState = {
  projects: [],
  isLoaded: false,
  loading: false,
  error: null,
};
