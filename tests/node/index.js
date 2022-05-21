const ejs = require('ejs');

const { frag, tag, style, exp, cond, code, forLoop, doLoop, whileLoop, fromJson } = require('../../index');

// FRAG

{
	const content = frag([
		'Hello',
		tag('br'),
		tag('strong', null, ['World'])
	]);

	console.group('CONTENT');
	console.log(content);
	console.groupEnd();
}

// TAG

{
	const content = tag('div', { class: 'hello-world' }, [
		'Hello',
		tag('br'),
		tag('strong', null, ['World'])
	]);

	console.log('');
	console.group('CONTENT');
	console.log(content);
	console.groupEnd();
}

// STYLE

{
	const content = frag([
		tag('style', null, [
			style({
				'@media screen': {
					'body': {
						'color': '#000000',
						'background-color': '#ffffff'
					}
				}
			})
		]),
		tag('div', {
			style: style({
				'color': '#000000',
				'background-color': '#ffffff'
			})
		}, ['Hello World'])
	]);

	console.log('');
	console.group('CONTENT');
	console.log(content);
	console.groupEnd();
}

// EXP

{
	const content = tag('div', { class: exp('className') }, [
		exp('message')
	]);

	console.log('');
	console.group('CONTENT');
	console.log(content);
	console.groupEnd();
}

// COND

{
	const content = frag([
		cond(
			'locals.title != null',
			[tag('h1', null, [exp('title')])],
			cond(
				'locals.subtitle != null',
				[tag('h1', null, [exp('subtitle')])],
				[tag('h1', null, ['Default Title'])]
			)
		),
		tag('p', null, ['Hello World'])
	]);

	console.log('');
	console.group('CONTENT');
	console.log(content);
	console.groupEnd();
	console.group('RENDER');
	console.log(ejs.render(content, {}));
	console.groupEnd();
}

// FOR LOOP

{
	const content = tag('ul', null, [
		forLoop('index = 0, length = array.length', 'index < length', 'index++', [
			tag('li', null, [
				exp('array[index]')
			])
		])
	]);

	console.log('');
	console.group('CONTENT');
	console.log(content);
	console.groupEnd();
	console.group('RENDER');
	console.log(ejs.render(content, { array: ['abc', 'def', 'ghi'] }));
	console.groupEnd();
}

// DO LOOP

{
	const content = tag('ul', null, [
		code('let x = 0'),
		doLoop([
			tag('li', null, [
				exp('value')
			]),
			code('x++')
		], 'x < 10')
	]);

	console.log('');
	console.group('CONTENT');
	console.log(content);
	console.groupEnd();
	console.group('RENDER');
	console.log(ejs.render(content, { value: 'test' }));
	console.groupEnd();
}

// WHILE LOOP

{
	const content = tag('ul', null, [
		code('let x = 0'),
		whileLoop('x < 10', [
			tag('li', null, [
				exp('x')
			]),
			code('x++')
		])
	]);

	console.log('');
	console.group('CONTENT');
	console.log(content);
	console.groupEnd();
	console.group('RENDER');
	console.log(ejs.render(content, {}));
	console.groupEnd();
}

// FROM JSON

{
	const content = fromJson([
		{
			type: 'tag',
			name: 'p',
			children: ['Hi ']
		},
		{
			type: 'tag',
			name: 'div',
			children: [
				'Hello ',
				{
					type: 'tag',
					name: 'strong',
					children: [
						cond('locals.message != null', exp('message'), 'World')
					]
				}
			]
		}
	]);

	console.log('');
	console.group('CONTENT');
	console.log(content);
	console.groupEnd();
	console.group('RENDER');
	console.log(ejs.render(content, {}));
	console.groupEnd();
}
