import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";

const main = async()=>{
    const orm = await MikroORM.init({
        entities:[Post],
        dbName:'reddit',
        type:"mysql",
        debug:true
    })
}

main()