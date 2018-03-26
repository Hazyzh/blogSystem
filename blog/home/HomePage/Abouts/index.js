import React from 'react'

const About = () => (
  <div className="about-me">
	<div className="item-one">
		<h2>About Me</h2>
		<i className="line"></i>
		<div className="item">
			<p>
				My name is Hou ZengHao (侯增皓) . I was born in 1991s.
			</p>
			<p>
				I am an IT developer focusing on web technology. Now I am employed by RingCentral as an Node/JavaScript engineer.
			</p>
			<p>
				I graduated  from  Southwest Minzu university and my major is computer science.
			</p>
			<p>
				In spare time, I like reading book, play basketball and taking a jogging outdoors.
			</p>
		</div>
	</div>

	<div className="item-one">
		<h2>Photo</h2>
		<i className="line"></i>
			<div className="item">
				<p>
					<a href="/photo">* here </a>
				</p>
			</div>
	</div>

	<div className="item-one">
		<h2>Others</h2>
		<i className="line"></i>
		<div className="item">
			<p>
				* email - <b>532599877@qq.com</b>
			</p>
			<p>
				<a href="https://github.com/Hazyzh">* Github</a>
			</p>
		</div>
	</div>
	<div>
		<i className="line"></i>
		<p className="end">
			| www.hazyzh.com
		</p>
	</div>
  </div>
)

export default About
