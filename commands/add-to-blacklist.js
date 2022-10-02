const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { blacklist, blacklistLog, blacklistCommandChannel } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-to-blacklist')
		.setDescription('Adds player to the blacklist')
		.addStringOption(option =>
			option.setName('playername').setDescription('The player name').setRequired(true))
		.addStringOption(option =>
			option.setName('reason').setDescription('Reason for blacklisting').setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.has('1024309573894557697')) {
			return interaction.reply('You do not have permissions to do this. Ask an Alliance Leader to do it for you.');
		};

		if (!interaction.channel.id == blacklistCommandChannel) {
			const channelName = interaction.client.channels.cache.get(blacklistCommandChannel).name;
			return interaction.reply('Please use the ' + channelName + ' channel for this.');
		};

		const player = interaction.options.getString('playername');
		const reason = interaction.options.getString('reason');
		const leader = interaction.user.username;

		const blacklistEmbed = new EmbedBuilder()
			.setTitle("Player Added To Blacklist")
			.addFields(
				{ name: "Player:", value: player, inline: true },
				{ name: "Reason:", value: reason, inline: true },
				{ name: "Added By:", value: leader, inline: true },
			);

		return interaction.client.channels.cache.get(blacklist)
			.send({ embeds: [blacklistEmbed] })
			.then(interaction.reply({ content: 'Player ' + player + ' has been added to blacklist by ' + leader + ' for these reasons: ' + reason + '.'}));
	},
};