import { Project } from '../../interface/project';

export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

export const initialProjectsState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};
