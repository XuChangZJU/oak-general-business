import { GeneralFeatures } from '../features';
import { EntityDict } from '../general-app-domain';
import { BRC, FrcAspectDict, FRC } from '../types/RuntimeCxt';
export default function useFeatures(): GeneralFeatures<EntityDict, BRC, FRC, FrcAspectDict>;
