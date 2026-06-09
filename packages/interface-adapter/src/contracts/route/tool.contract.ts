import z from 'zod';

import { defineContract, jsonResponse } from '../contract.type';
import { ErrorResponseDTOSchema } from '../dto/common.dto';
import {
  ToolBatchDetailDTOSchema,
  ToolBatchDetailInputDTOSchema,
  ToolDetailDTOSchema,
  ToolGetParamsDTOSchema,
  ToolListDTOSchema,
  ToolListParamsDTOSchema,
  ToolRunInputDTOSchema
} from '../dto/tool.dto';

import { authToken } from './auth';

export const ToolContract = {
  Get: defineContract({
    meta: {
      method: 'get',
      path: '/tool',
      operationId: 'tool.get',
      description: 'Get a tool by pluginId, version and source',
      summary: 'Get tool detail',
      tags: ['plugin', 'tool'],
      security: authToken
    },
    request: ToolGetParamsDTOSchema,
    response: {
      200: jsonResponse({ data: ToolDetailDTOSchema }),
      404: jsonResponse({ error: ErrorResponseDTOSchema })
    }
  }),
  BatchDetail: defineContract({
    meta: {
      method: 'post',
      path: '/tools/detail',
      operationId: 'tool.batchDetail',
      description: 'Get tool details by plugin ids, versions and sources',
      summary: 'Get tool details',
      tags: ['plugin', 'tool'],
      security: authToken
    },
    request: ToolBatchDetailInputDTOSchema,
    response: {
      200: jsonResponse({ data: ToolBatchDetailDTOSchema }),
      404: jsonResponse({ error: ErrorResponseDTOSchema })
    }
  }),
  List: defineContract({
    meta: {
      method: 'get',
      path: '/tools',
      operationId: 'tool.list',
      description: 'List tools with optional filters',
      summary: 'List tools',
      tags: ['plugin', 'tool'],
      security: authToken
    },
    request: ToolListParamsDTOSchema,
    response: {
      200: jsonResponse({ data: ToolListDTOSchema }),
      500: jsonResponse({ error: ErrorResponseDTOSchema })
    }
  }),
  RunStream: defineContract({
    meta: {
      method: 'post',
      path: '/tool/runStream',
      operationId: 'tool.runStream',
      description: 'Run a tool and return stream messages',
      summary: 'Run tool stream',
      tags: ['plugin', 'tool'],
      security: authToken
    },
    request: ToolRunInputDTOSchema,
    response: {
      200: z.object({
        type: z.string()
      }),
      400: jsonResponse({
        error: ErrorResponseDTOSchema
      })
    }
  })
} as const;

export const ToolRunContract = ToolContract.RunStream;
