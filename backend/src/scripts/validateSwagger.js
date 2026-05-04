import swaggerSpec from '../config/swagger.js';

try {
  if (!swaggerSpec || !swaggerSpec.paths) {
    throw new Error('Invalid Swagger spec');
  }

  console.log('\n=================================');
  console.log('✅ Swagger validation successful');
  console.log('=================================\n');

  console.log('➡️  Swagger UI:');
  console.log('   http://localhost:5000/api-docs');

  console.log('\n➡️  Swagger JSON:');
  console.log('   http://localhost:5000/api-docs.json\n');

  process.exit(0);
} catch (error) {
  console.error('\n=================================');
  console.error('❌ Swagger validation failed');
  console.error('=================================\n');

  console.error(error.message);

  process.exit(1);
}
