import mongoose from 'mongoose';



const Connection = async ()=>{
    const URL='mongodb+srv://root:root@bridle.diuhpge.mongodb.net/bridle?retryWrites=true&w=majority';
    try{
           mongoose.connect(URL, { useUnifiedTopology: true, usenewurlparser: true });
           console.log('MongoDB connected Successfully!');
    }catch(error){
        console.log('error while connecting to the database',error);
    }
}

export default Connection;