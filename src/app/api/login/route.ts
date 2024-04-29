import { getDBConnection } from "@/app/database/connection";
import { User } from "@/app/models/User";

export async function POST(req:Request) {
    const connection = await getDBConnection();
    try {
       const {email, password} = await req.json()
       if(!email || !password || email === '' || password === ''){
        return Response.json({ auth: false, message: "Credenciais incompletas ou em branco" }, { status: 400 })
       }
       const userRepository = connection.getRepository(User)
       const findUser = await userRepository.findOneBy({ email: email})
       
       if(!findUser){
        return Response.json({ auth: false, message: "Falha ao buscar usuario" }, { status: 404 })
       }
       if(password !== findUser.password){
        return Response.json({ auth: false, message:"Senha incorreta"}, { status: 401 })
        }

        return Response.json({ auth: true, message:"Sucesso"}, { status: 200 })
    
    } catch (error) {
        console.error('Erro:', error);
        return Response.json({ message: "Internal Server Error"}, {status: 500})
    }
}