import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ProdutosController {
    public async create(req: Request, res: Response) {
        try {
            const { id_usuario } = req.params;
            const { nome, preco, descricao, categorias } = req.body;
            const precoFloat = parseFloat(preco);
            const usuario = await prisma.usuario.findUnique({
                where: { id_usuario: Number(id_usuario) }
            })

            if (!usuario) {
                return res.status(404).json({
                    message: "Usuario não encontrado"
                });
            }
            const novoProduto = await prisma.produto.create({
                data: {
                    nome,
                    preco: precoFloat,
                    descricao,
                    categorias,
                    cadastrador: { connect: { id_usuario: Number(id_usuario) } }
                }, include: {
                    cadastrador: true
                }
            });
            return res.status(201).json({
                message: "Produto cadastrado com sucesso",
                cadastro: novoProduto
            })
        } catch (error) {
            return res.status(500).json({
                messageError: "Erro interno no servidor",
                error: error
            })
        }
    }
    public async read(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const produto = await prisma.produto.findUnique({
                where: { id_produto: Number(id) }
            })
            res.json(produto);
        } catch (error) {
            return res.status(500).json({
                messageError: "Erro interno no servidor",
                error: error
            })
        }
    }
    public async readAll(req: Request, res: Response) {
        try {
            const produtos = await prisma.produto.findMany();
            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(500).json({
                messageError: "Erro interno no servidor",
                error: error
            })
        }
    }
    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, preco, descricao, categorias } = req.body;
            const precoFloat = parseFloat(preco);
            const produto = await prisma.produto.update({
                where: { id_produto: Number(id) },
                data: {
                    nome,
                    preco: precoFloat,
                    descricao,
                    categorias
                },
            });
            res.status(200).json(produto);
        } catch (error) {
            return res.status(500).json({
                messageError: "Erro interno no servidor",
                error: error
            })
        }
    }
    public async destroy(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const produto = await prisma.produto.delete({
                where: { id_produto: Number(id) }
            });
            res.status(204).json(produto);
        }
        catch (error) {
            return res.status(500).json({
                messageError: "Erro interno no servidor",
                error: error
            })
        }
    }

}

export const produtosController = new ProdutosController();