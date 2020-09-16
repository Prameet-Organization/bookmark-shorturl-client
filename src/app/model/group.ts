export interface Group{
    id?: number;
    groupType?: string;
    groupName?: string;
    tribe?: Group;
}
