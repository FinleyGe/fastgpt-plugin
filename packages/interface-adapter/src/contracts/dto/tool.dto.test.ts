import { describe, expect, it } from 'vitest';

import { ToolBatchDetailInputDTOSchema, ToolGetParamsDTOSchema } from './tool.dto';

describe('ToolGetParamsDTOSchema', () => {
  it('parses fallbackLatestVersion from URL query strings', () => {
    expect(
      ToolGetParamsDTOSchema.parse({
        pluginId: 'getTime',
        fallbackLatestVersion: 'true'
      }).fallbackLatestVersion
    ).toBe(true);

    expect(
      ToolGetParamsDTOSchema.parse({
        pluginId: 'getTime',
        fallbackLatestVersion: 'false'
      }).fallbackLatestVersion
    ).toBe(false);
  });

  it('keeps boolean fallbackLatestVersion for SDK callers', () => {
    const query = ToolGetParamsDTOSchema.parse({
      pluginId: 'getTime',
      fallbackLatestVersion: true
    });

    expect(query.fallbackLatestVersion).toBe(true);
  });
});

describe('ToolBatchDetailInputDTOSchema', () => {
  it('keeps complete detail params and parses fallbackLatestVersion', () => {
    const payload = ToolBatchDetailInputDTOSchema.parse({
      ids: [
        {
          pluginId: 'getTime',
          version: '1.0.0',
          source: 'community',
          fallbackLatestVersion: 'true'
        }
      ]
    });

    expect(payload.ids).toEqual([
      {
        pluginId: 'getTime',
        version: '1.0.0',
        source: 'community',
        fallbackLatestVersion: true
      }
    ]);
  });

  it('rejects string ids because batch detail expects object ids', () => {
    expect(() =>
      ToolBatchDetailInputDTOSchema.parse({
        ids: ['getTime']
      })
    ).toThrow();
  });
});
