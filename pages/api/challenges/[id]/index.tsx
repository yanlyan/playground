import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { Challenge } from "../../../../database/entities/Challenge";
import initializeDatabase from "../../../../database/init";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const connection = await initializeDatabase();
  try {
    const challenge: Challenge = await _getData(req.query.id);
    res.status(200).json({ data: challenge });
  } catch (error) {
    await connection.close();
  }
};

async function _getData(id): Promise<Challenge> {
  const challengeRepo = await getRepository(Challenge);
  const challenge = await challengeRepo.findOne(id, { relations: ["student"] });
  return challenge;
}
