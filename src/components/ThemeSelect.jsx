export default function ThemeSelect(props) {
	const { value, changeTheme } = props;
	return <>
		<label htmlFor="theme" className="mr-2">Theme: </label>
		<select name="theme" id="theme" value={value} onChange={e => changeTheme(e.target.value)}>
			<option value="cobalt">cobalt</option>
			<option value="monokai">monokai</option>
			<option value="elegant" >elegant</option>
			<option value="the-matrix" >matrix</option>
			<option value="ssms" >ssms</option>
			<option value="xq-light" >xq-light</option>
			<option value="ttcn" >ttcn</option>
			<option value="rubyblue" >rubyblue</option>
		</select>
	</>
}