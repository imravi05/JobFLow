import Dexie, { type EntityTable } from 'dexie';
import type { Application } from '../types/application';

// Define the database
const db = new Dexie('JobFlowDB') as Dexie & {
  applications: EntityTable<
    Application,
    'id' // primary key "id"
  >;
};

// Schema declaration
db.version(1).stores({
  applications: '++id, status, appliedDate, company, portal', // Primary key and indexed props
});

export { db };
