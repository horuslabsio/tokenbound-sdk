import { TokenBoundModal, TokenboundConnector } from "./connector";
import { useTokenBoundModal } from "./modal/hooks";
import { Connector } from "./connector/types/connector";
import { ModalWallet, ModalResult, IModal } from "./connector/types/modal";

export {
    TokenBoundModal,
    useTokenBoundModal,
    TokenboundConnector
}

export type {
    ModalWallet,
    ModalResult,
    IModal,
    Connector
}