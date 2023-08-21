import { createServer } from "./server";
import { log } from "logger";
import { transformer } from "trpc-transformer";


type CreateContextOptions = {
  req: any;
  res: any;
  // res: NextApiResponse<any>
  // req: NextApiRequest
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    // prisma,
    res: opts.res,
    req: opts.req,
    trans: transformer,
  };
};

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: CreateContextOptions) => {
  const { req, res } = opts;

  return createInnerTRPCContext({
    res,
    req,
  });
};

const port = process.env.PORT || 5001;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});
