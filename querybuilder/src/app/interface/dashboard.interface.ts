export interface Catalogue {
    header?: Array<string>;
    result: Array<CatalogueData>;
    totalRecords?: number;
    queryID?: string;
    nextstate?: boolean;
    previousstate?: boolean;
    rawDataSize?: number;
}

interface CatalogueData {
    Catalog: string;
}

export interface Schema {
    header?: Array<string>;
    result: Array<SchemaData>;
    totalRecords?: number;
    queryID?: string;
    nextstate?: boolean;
    previousstate?: boolean;
    rawDataSize?: number;
}

interface SchemaData {
    Catalog: string;
}

export interface Table {
    header?: Array<string>;
    result: Array<TableData>;
    totalRecords?: number;
    queryID?: string;
    nextstate?: boolean;
    previousstate?: boolean;
    rawDataSize?: number;
}

interface TableData {
    Table: string;
}
