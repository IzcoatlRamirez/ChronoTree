import app from "./app";
import { connectDB } from "./prisma";


connectDB();

app.listen(3000,()=>{
    console.log('server on port',3000)
});

