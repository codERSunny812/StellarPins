import cron from 'node-cron'
import axios from 'axios'


// function to start cron job
export const  runCronJob = ()=>{

    console.log("cron job started");

    cron.schedule('*/5 * * * *',async()=>{
     console.log("cron job is running");
     try {
         // Replace with your Render service URL
         const response = await axios.get('https://stellarpins.onrender.com');
         console.log('Pinged the service:', response.status);
     } catch (error) {
         console.error('Error pinging the service:', error);
     }
    })

    


}

