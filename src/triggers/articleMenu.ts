import { EntityDict } from '../general-app-domain/EntityDict';
import { Trigger } from 'oak-domain/lib/types';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { assert } from 'oak-domain/lib/utils/assert';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { OakPreConditionUnsetException } from 'oak-domain/lib/types';
import { RuntimeCxt } from '../types/RuntimeCxt';

const triggers: Trigger<EntityDict, 'articleMenu', BackendRuntimeContext<EntityDict>>[] = [
    {
        name: '在创建文章分类时，查询文章分类是否重名',
        entity: 'articleMenu',
        action: 'create',
        when: 'before',
        fn: async (event: any, context: any) => {
            const {
                operation: { data },
            } = event;
            assert(!(data instanceof Array)); // 不可能是成组创建
            if ((data as any).name && (data as any).parentId) {
                const [articleMenu] = await context.select(
                    'articleMenu',
                    {
                        data: {
                            id: 1,
                            name: 1,
                            parentId: 1,
                        },
                        filter: {
                            name: (data as any).name,
                            parentId: (data as any).parentId,
                        },
                    },
                    {},
                );
                if (articleMenu) {
                    throw new OakPreConditionUnsetException(
                        `父分类的同一子集中存在同名分类【${(data as any).name}】，请重新输入`
                    );
                }
            }
            return 0;
        },
    },
    {
      name: '在更新文章分类时，查询文章分类是否重名',
      entity: 'articleMenu',
      action: 'update',
      when: 'before',
      fn: async (event, context) => {
          const {
              operation: { data, filter },
          } = event;
          assert(!(data instanceof Array)); // 不可能是成组创建
          if ((data as any).name) {
              const [articleMenus] = await context.select(
                  'articleMenu',
                  {
                      data: {
                          id: 1,
                          name: 1,
                          parentId: 1,
                      },
                      filter,
                  },
                  {},
              );
              if(articleMenus && articleMenus.parentId) {
                const [articleMenus2] = await context.select(
                  'articleMenu',
                  {
                      data: {
                          id: 1,
                          name: 1,
                          parentId: 1,
                      },
                      filter: {
                          name: (data as any).name,
                          parentId: articleMenus.parentId as string,
                      },
                  },
                  {},
              );
                if (articleMenus2) {
                    throw new OakPreConditionUnsetException(
                        `父分类的同一子集中存在同名分类【${(data as any).name}】，请重新输入`
                    );
                }
              }
          }
          return 1;
      },
    }
];
export default triggers;