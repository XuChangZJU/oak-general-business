

import { useFeatures as useCommonFeatures } from 'oak-frontend-base/lib/platforms/web/features';
import { BasicFeatures } from 'oak-frontend-base/lib/features/index';
import { GeneralFeatures } from '../features';
import { EntityDict } from '../oak-app-domain';
import { BRC, FrcAspectDict, FRC } from '../types/RuntimeCxt';

// react 独有
export default function useFeatures() {
    return useCommonFeatures<
        GeneralFeatures<EntityDict, BRC, FRC, FrcAspectDict> & BasicFeatures<EntityDict, BRC, FRC, FrcAspectDict>
    >();
};