/**
 * Usecase Description
 * Description：Tool Batch Detail
 * Version：v1.0.0
 * Author：FinleyGe
 */

import type {
  ToolBatchDetailInputType,
  ToolBatchDetailOutputType,
  ToolManagerPort
} from '@domain/ports/plugin/tool.port';
import { failureResult, type Result, successResult } from '@domain/value-objects/result.vo';
import type { UsecaseLogger } from '@usecase/logger.port';

export type ToolBatchDetailUCDeps = {
  toolManager: ToolManagerPort;
  logger: UsecaseLogger;
};

type Input = ToolBatchDetailInputType;
type Output = Promise<Result<ToolBatchDetailOutputType>>;

export const makeToolBatchDetailUC =
  ({ logger, toolManager }: ToolBatchDetailUCDeps) =>
  async (input: Input): Output => {
    logger.debug('Tool Batch Detail', { input });
    const [result, error] = await toolManager.batchDetail(input);
    if (error) {
      logger.error('Tool Batch Detail Error', error);
      return failureResult(error);
    }
    return successResult(result);
  };
