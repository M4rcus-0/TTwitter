import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UsuarioController {
    public async create(req: Request, res: Response) {
        const { nome, email, cpf, senha, telefone } = req.body;
        try {
            const novoUsuario = await prisma.usuario.create(
                {
                    data: {
                        nome,
                        cpf,
                        email,
                        telefone,
                        senha
                    },
                    select: {
                        nome: true,
                        email: true,
                        cpf: true,
                        telefone: true,
                        senha: false
                    }
                });

            return res.status(201).json({
                message: "Usuario criado com sucesso",
                usuario: novoUsuario,
            });
        }
        catch (error) {
            return res.status(500).json({
                messageError: "Erro interno no servidor",
                error: error,
            })
        }
    }

    public async readAll(req: Request, res: Response) {
        try {
            const usuarios = await prisma.usuario.findMany();
            return res.status(200).json(usuarios);
        }
        catch (error) {
            return res.status(500).json({
                messageError: "Erro interno no servidor",
                error: error,
            })
        }
    }

    public async read(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const usuario = await prisma.usuario.findUnique({
                where: { id_usuario: Number(id) }
            })
            res.status(200).json(usuario);
        }
        catch (error) {
            return res.status(500).json({
                messageError: "Erro interno no servidor",
                error: error,
            })
        }
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, email, cpf, senha, telefone } = req.body;
        try {
            const usuario = await prisma.usuario.update({
                data:  {
                    nome,
                    cpf,
                    email,
                    telefone,
                    senha
                },
                where: { id_usuario: Number(id) }
            })
            res.status(200).json(usuario);
        }
        catch (error) {
            return res.status(500).json({
                messageError: "Erro interno no servidor",
                error: error,
            })
        }
    }

    public async destroy(req: Request, res: Response){
        const { id } = req.params;
        try{
            const usuario = await prisma.usuario.delete({
                where: {id_usuario: Number(id)}
            })
            res.status(204).json(usuario);
        }catch (error) {
            return res.status(500).json({
                messageError: "Erro interno no servidor",
                error: error,
            })
        }
    }
}

export const usuarioController = new UsuarioController();
