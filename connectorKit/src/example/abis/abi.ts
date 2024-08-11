export const ABI = [
  {
    name: 'core::integer::u256',
    type: 'struct',
    members: [
      {
        name: 'low',
        type: 'core::integer::u128',
      },
      {
        name: 'high',
        type: 'core::integer::u128',
      },
    ],
  },
  {
    name: 'get_current_count',
    type: 'function',
    inputs: [],
    outputs: [
      {
        type: 'core::integer::u256',
      },
    ],
    state_mutability: 'view',
  },
  {
    name: 'increment',
    type: 'function',
    inputs: [],
    outputs: [],
    state_mutability: 'external',
  },
  {
    name: 'decrement',
    type: 'function',
    inputs: [],
    outputs: [],
    state_mutability: 'external',
  },
  {
    kind: 'enum',
    name: 'counter::counter::SimpleCounter::Event',
    type: 'event',
    variants: [],
  },
] as const;

export const TBAABI = [
  {
    "name": "UpgradeableImpl",
    "type": "impl",
    "interface_name": "token_bound_accounts::interfaces::IUpgradeable::IUpgradeable"
  },
  {
    "name": "token_bound_accounts::interfaces::IUpgradeable::IUpgradeable",
    "type": "interface",
    "items": [
      {
        "name": "upgrade",
        "type": "function",
        "inputs": [
          {
            "name": "new_class_hash",
            "type": "core::starknet::class_hash::ClassHash"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "AccountImpl",
    "type": "impl",
    "interface_name": "token_bound_accounts::interfaces::IAccount::IAccount"
  },
  {
    "name": "core::array::Span::<core::felt252>",
    "type": "struct",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    "name": "core::starknet::account::Call",
    "type": "struct",
    "members": [
      {
        "name": "to",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "selector",
        "type": "core::felt252"
      },
      {
        "name": "calldata",
        "type": "core::array::Span::<core::felt252>"
      }
    ]
  },
  {
    "name": "core::integer::u256",
    "type": "struct",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "name": "core::bool",
    "type": "enum",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "name": "token_bound_accounts::interfaces::IAccount::IAccount",
    "type": "interface",
    "items": [
      {
        "name": "is_valid_signature",
        "type": "function",
        "inputs": [
          {
            "name": "hash",
            "type": "core::felt252"
          },
          {
            "name": "signature",
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "is_valid_signer",
        "type": "function",
        "inputs": [
          {
            "name": "signer",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "__validate__",
        "type": "function",
        "inputs": [
          {
            "name": "calls",
            "type": "core::array::Array::<core::starknet::account::Call>"
          }
        ],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "external"
      },
      {
        "name": "__validate_declare__",
        "type": "function",
        "inputs": [
          {
            "name": "class_hash",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "__validate_deploy__",
        "type": "function",
        "inputs": [
          {
            "name": "class_hash",
            "type": "core::felt252"
          },
          {
            "name": "contract_address_salt",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "__execute__",
        "type": "function",
        "inputs": [
          {
            "name": "calls",
            "type": "core::array::Array::<core::starknet::account::Call>"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<core::array::Span::<core::felt252>>"
          }
        ],
        "state_mutability": "external"
      },
      {
        "name": "token",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "(core::starknet::contract_address::ContractAddress, core::integer::u256)"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "owner",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "lock",
        "type": "function",
        "inputs": [
          {
            "name": "duration",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "is_locked",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "(core::bool, core::integer::u64)"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "supports_interface",
        "type": "function",
        "inputs": [
          {
            "name": "interface_id",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "name": "constructor",
    "type": "constructor",
    "inputs": [
      {
        "name": "token_contract",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "token_id",
        "type": "core::integer::u256"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "token_bound_accounts::account::account::AccountComponent::AccountCreated",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "token_bound_accounts::account::account::AccountComponent::AccountLocked",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "account",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "locked_at",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "duration",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "name": "core::array::Span::<core::array::Span::<core::felt252>>",
    "type": "struct",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<core::array::Span::<core::felt252>>"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "token_bound_accounts::account::account::AccountComponent::TransactionExecuted",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "hash",
        "type": "core::felt252"
      },
      {
        "kind": "data",
        "name": "response",
        "type": "core::array::Span::<core::array::Span::<core::felt252>>"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "token_bound_accounts::account::account::AccountComponent::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "AccountCreated",
        "type": "token_bound_accounts::account::account::AccountComponent::AccountCreated"
      },
      {
        "kind": "nested",
        "name": "AccountLocked",
        "type": "token_bound_accounts::account::account::AccountComponent::AccountLocked"
      },
      {
        "kind": "nested",
        "name": "TransactionExecuted",
        "type": "token_bound_accounts::account::account::AccountComponent::TransactionExecuted"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "token_bound_accounts::upgradeable::upgradeable::UpgradeableComponent::Upgraded",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "class_hash",
        "type": "core::starknet::class_hash::ClassHash"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "token_bound_accounts::upgradeable::upgradeable::UpgradeableComponent::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "Upgraded",
        "type": "token_bound_accounts::upgradeable::upgradeable::UpgradeableComponent::Upgraded"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "token_bound_accounts::presets::account::Account::Event",
    "type": "event",
    "variants": [
      {
        "kind": "flat",
        "name": "AccountEvent",
        "type": "token_bound_accounts::account::account::AccountComponent::Event"
      },
      {
        "kind": "flat",
        "name": "UpgradeableEvent",
        "type": "token_bound_accounts::upgradeable::upgradeable::UpgradeableComponent::Event"
      }
    ]
  }
]