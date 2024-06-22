import { app } from './server';

const PORT = process.env.PORT || 4000;

app.listen(5500, () => console.log(`Running on http://localhost:${PORT}`));
