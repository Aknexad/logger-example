import { Request, Response, NextFunction, Router } from 'express';

// import { localLogger } from './logger';
import { logger } from './opensearch.logger';

const router = Router();

export = (): Router => {
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('get home Page', {
        serviceName: 'app-one',
        userId: '1',
        workspaceId: '234',
        ip: req.ip,
      });
      const result = {};
      res
        .status(200)
        .json({ statusCode: 200, statusMessage: 'ok', errors: [], data: result });
    } catch (error) {
      next(error);
    }
  });

  router.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.error('something is wrong', {
        serviceName: 'app-one',
        userId: '1',
        workspaceId: '234',
        ip: req.ip,
      });

      const result = '';
      res
        .status(500)
        .json({ statusCode: 500, statusMessage: '', errors: [], data: result });
    } catch (error) {
      next(error);
    }
  });

  router.put('/posts', async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('update post', {
        serviceName: 'app-one',
        userId: '1',
        workspaceId: '234',
        ip: req.ip,
      });

      const result = '';
      res
        .status(200)
        .json({ statusCode: 200, statusMessage: 'ok', errors: [], data: result });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/posts', async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('delete post', {
        serviceName: 'app-one',
        userId: '1',
        workspaceId: '234',
        ip: req.ip,
      });

      const result = '';
      res
        .status(200)
        .json({ statusCode: 200, statusMessage: 'ok', errors: [], data: result });
    } catch (error) {
      next(error);
    }
  });
  return router;
};
