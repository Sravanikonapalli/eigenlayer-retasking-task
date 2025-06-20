INSERT INTO restakers (user_address, amount_restaked_steth, target_avs_operator_address, last_updated)
VALUES ('0xABC...', 100.5, '0xVAL1...', strftime('%s','now'));

INSERT INTO validators (operator_address, total_delegated_stake_steth, status, last_updated)
VALUES ('0xVAL1...', 5000.0, 'active', strftime('%s','now'));

INSERT INTO rewards (wallet_address, total_rewards_received_steth, last_updated)
VALUES ('0xABC...', 75.2, strftime('%s','now'));

INSERT INTO reward_breakdown (reward_id, operator_address, amount_steth, timestamp)
VALUES (1, '0xVAL1...', 75.2, strftime('%s','now'));
