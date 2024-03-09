import type { StarknetWindowObject } from "get-starknet-core"
import type { Connector, ConnectorIcons } from "../types/connector"

export type StoreVersion = "chrome" | "firefox" | "edge"

export type ModalWallet = {
  name: string
  id: string
  icon: ConnectorIcons
  download?: string
  subtitle?: string
  title?: string
  connector: Connector
}

export type ModalResult = {
  connector: Connector
  wallet?: StarknetWindowObject | null
}

export type IModal = {
  isOpen:boolean,
  closeModal: () => void,
  value:string,
  selectedOption: string,
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  handleChangeInput: (event:React.ChangeEvent<HTMLInputElement>) => void,
  onConnect: () => void
}
