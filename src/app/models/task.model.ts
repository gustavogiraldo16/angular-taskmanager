export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    dueDate: string;
    user_id: string;
}