import { BasicFeatures } from 'oak-frontend-base/lib/features/index';
import { GeneralFeatures } from '../features';
import { EntityDict } from '../oak-app-domain';
import { BRC, FrcAspectDict, FRC } from '../types/RuntimeCxt';
export default function useFeatures(): GeneralFeatures<EntityDict, BRC, FRC, FrcAspectDict> & BasicFeatures<EntityDict, BRC, FRC, FrcAspectDict>;
