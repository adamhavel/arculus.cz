const AGENTS = [
	'Amazonbot',
	'anthropic-ai',
	'Applebot',
	'AwarioRssBot',
	'AwarioSmartBot',
	'Bytespider',
	'CCBot',
	'ChatGPT',
	'ChatGPT-User',
	'Claude-Web',
	'ClaudeBot',
	'cohere-ai',
	'DataForSeoBot',
	'Diffbot',
	'FacebookBot',
	'GPTBot',
	'ImagesiftBot',
	'magpie-crawler',
	'omgili',
	'Omgilibot',
	'peer39_crawler',
	'PerplexityBot',
	'YouBot',
	'AhrefsBot',
	'SemrushBot',
	'Screaming Frog',
	'DotBot',
	'MJ12bot',
	'SeobilityBot',
	'Scrapy',
	'Crawler4j',
	'ZoominfoBot',
	'SerpstatBot',
	'AspiegelBot',
	'NetcraftSurveyAgent',
	'Xenu Link Sleuth',
	'OpenAI-User',
	'AnthropicBot',
	'MicrosoftEdgeBot',
	'ia_archiver',
	'PetalBot',
	'UptimeRobot',
	'Site24x7',
	'PingdomBot',
	'Nutch',
	'LinkChecker',
	'BLEXBot',
	'Mail.RU_Bot',
	'AboundBot',
	'MegaIndex.ru',
	'masscan',
	'Nmap',
	'sqlmap',
	'Zgrab',
	'Zmap',
	'python-requests',
	'wget',
	'libwww-perl',
];

export default async (request) => {
	const ua = request.headers.get('user-agent');
	const isBot = AGENTS.some((agent) =>
		ua.toLowerCase().includes(agent.toLocaleLowerCase())
	);

	if (isBot) {
		//return new Response(null, { status: 401 });
	}
};

export const config = {
	path: '*',
};
