
function frag(children) {
	return children == null
		? ''
		: !Array.isArray(children)
			? children
			: children.filter((value) => value != null).join('');
}

function tag(name, attributes, children) {
	if (typeof name === 'function') {
		name(attributes, children);
	}

	const openTag = `<${[
		name,
		...attributes == null
			? []
			: Object.keys(attributes)
				.map((key) => attributes[key] == null ? null : `${key}="${attributes[key]}"`)
				.filter((attribute) => attribute != null)
	].join(' ')}>`;

	if (children == null) {
		return openTag;
	}

	return `${openTag}${frag(children)}</${name}>`;
}

function style(properties) {
	return properties == null
		? ''
		: Object.keys(properties).map((key) =>
			properties[key] == null
				? null
				: properties[key] && typeof properties[key] === 'object'
					? `${key} { ${style(properties[key])} }`
					: `${key}: ${properties[key]};`
		).filter((value) => value != null).join(' ');
}

function exp(value, { escaped = false } = {}) {
	return `${escaped ? '<%-' : '<%='} ${value} %>`;
}

function code(value) {
	return ['<%', value == null ? null : value, '%>']
		.filter((value) => value != null).join(' ');
}

function cond(condition, trueChildren, falseChildren) {
	return [
		code(`if (${condition}) {`),
		trueChildren == null ? null : frag(trueChildren),
		...falseChildren == null ? [] : ['<% } else { %>', frag(falseChildren)],
		code('}')
	].filter((value) => value != null).join('');
}

function forLoop(initial, condition, increment, children) {
	return [
		code(`for (let ${initial}; ${condition}; ${increment}) {`),
		children == null ? null : frag(children),
		code('}')
	].filter((value) => value != null).join('');
}

function doLoop(children, condition) {
	return [
		code('do {'),
		children == null ? null : frag(children),
		code(`} while(${condition})`)
	].filter((value) => value != null).join('');
}

function whileLoop(condition, children) {
	return [
		code(`while(${condition}) {`),
		children == null ? null : frag(children),
		code('}')
	].filter((value) => value != null).join('');
}

function fromJson(json) {
	return json == null
		? ''
		: Array.isArray(json)
			? fromJson({ type: 'frag', children: json })
			: (typeof json === 'object')
				? fromJson[json.type] ? fromJson[json.type](json) : ''
				: json;
}

fromJson.frag = ({ children } = {}) => frag(children == null ? children : Array.isArray(children) ? children.map((child) => fromJson(child)) : fromJson(children));
fromJson.tag = ({ name, attributes, children }) => tag(name, attributes, children == null ? children : fromJson(children));
fromJson.exp = ({ value, options }) => exp(value, options);
fromJson.code = ({ value }) => code(value);
fromJson.cond = ({ condition, trueChildren, falseChildren }) => cond(condition, trueChildren == null ? trueChildren : fromJson(trueChildren), falseChildren == null ? falseChildren : fromJson(falseChildren));
fromJson.forLoop = ({ initial, condition, increment, children }) => forLoop(initial, condition, increment, children == null ? children : fromJson(children));
fromJson.doLoop = ({ children, condition }) => doLoop(children == null ? children : fromJson(children), condition);
fromJson.whileLoop = ({ condition, children }) => whileLoop(condition, children == null ? children : fromJson(children));

module.exports =
{
	frag,
	tag,
	style,
	exp,
	code,
	cond,
	forLoop,
	doLoop,
	whileLoop,
	fromJson
};
