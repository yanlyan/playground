import { readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { IChallenge } from "../../../interfaces/IChallenge";
import getConfig from "next/config";
export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
  }
};

function _validateBody(req: NextApiRequest, res: NextApiResponse) {}

function _getData({ page, size }): IChallenge[] {
  const { serverRuntimeConfig } = getConfig();

  const path = join(
    serverRuntimeConfig.PROJECT_ROOT,
    "pages/api/data/challenges.json"
  );
  const data: IChallenge[] = JSON.parse(readFileSync(path, "utf-8"));

  return data;
}
