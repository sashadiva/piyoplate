import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import recipeRoutes from './routes/recipeRoutes';
import nutritionRoutes from './routes/nutrisionsRoutes';

const app = express();

app.use(cors()); // Enable CORS untuk semua origin
app.use(express.json());

// Grouping Routes
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/nutrition', nutritionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PiyoPlate Backend running on http://localhost:${PORT}`);
});