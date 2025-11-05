const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

async function checkColumn() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_name='courses' 
      ORDER BY ordinal_position
    `);
    
    console.log('Columns in courses table:');
    console.table(result.rows);
    
    const comingSoon = result.rows.find(col => col.column_name === 'coming_soon');
    if (comingSoon) {
      console.log('\n✅ coming_soon column exists!');
      console.log('Details:', comingSoon);
    } else {
      console.log('\n❌ coming_soon column NOT found!');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

checkColumn();
