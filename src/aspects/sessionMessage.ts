import { EntityDict } from "../oak-app-domain";
import { AppType, WechatPublicConfig } from "../oak-app-domain/Application/Schema";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { OakUserException } from 'oak-domain/lib/types';
import { WechatPublicEventData, WechatMpEventData } from 'oak-external-sdk';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import assert from "assert";