// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { IChallengePaginateParams } from "../../../interfaces/IChallenge";
import initializeDatabase from "../../../initializers/database";
import { getRepository } from "typeorm";
import { Challenge } from "../../../entities/Challenge";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const connection = await initializeDatabase();
  try {
    const { page, size } = _validateParams(req, res);

    const challenges = await _getData({ page, size });
    const total = await _countData();

    res.status(200).json({
      data: challenges,
      pagination: {
        total,
        page,
        size,
      },
    });
  } catch (error) {
    await connection.close();
    throw error;
  }
};

function _validateParams(
  req: NextApiRequest,
  res: NextApiResponse
): IChallengePaginateParams {
  const { page, size } = req.query;
  const s: number = size ? parseInt(size.toString()) : 10;
  const p: number = page ? parseInt(page.toString()) : 1;

  if (isNaN(s) || isNaN(p)) {
    res.status(400).send("Bad Request");
  }
  return { page: p, size: s };
}

async function _getData({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<Challenge[]> {
  const challengeRepo = await getRepository(Challenge);
  const challenges = await challengeRepo.find({
    relations: ["student", "reviewer"],
    take: size,
    skip: (page - 1) * size,
    order: {
      name: "ASC",
    },
  });

  return challenges;
}

async function _countData(): Promise<number> {
  const challengeRepo = await getRepository(Challenge);
  const challenges = await challengeRepo.count();

  return challenges;
}
