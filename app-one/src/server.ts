import express from 'express';

import { PORT } from './config';
import routers from './routers';
import { logger } from './opensearch.logger';

const start = async () => {
  const app = express();

  app.use(express.json());
  app.use(routers());
  //   app.use((error: Error, req: Request, res: Response, next: NextFunction) => {});

  logger.info('server app-one started.');

  app.listen(PORT, () => console.log(`server run on port ${PORT}`));
};

start();
