export interface TaskInterface {
  taskName: string;
  taskDetails: string;
  created_by: string;
  updated_by: string;
  started_at: Date;
  point: number;
  media?: any;
}
