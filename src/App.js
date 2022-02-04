import { useEffect, useState } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import Error from './components/Error/';
import Loading from './components/Loading/';

function App() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [jobs, setJobs] = useState([]);
	const [value, setValue] = useState(0);

	const getJobs = async () => {
		try {
			const res = await fetch('https://course-api.com/react-tabs-project');
			const jobs = await res.json();
			setJobs(jobs);
			setLoading(false);
			if (!res.ok) throw new Error(res.statusText);
		} catch (err) {
			setLoading(false);
			setError("can't fetch data");
			console.log(err);
		}
	};
	useEffect(() => {
		getJobs();
	}, []);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <Error />;
	}

	const { title, dates, duties, company, id } = jobs[value];

	return (
		<section className="section">
			<div className="title">
				<h2>experience</h2>
				<div className="underline"></div>
			</div>
			<div className="jobs-center">
				<div className="btn-container">
					{jobs.map((job, index) => {
						return (
							<button
								className={`job-btn ${index === value && 'active-btn'}`}
								onClick={() => setValue(index)}
								key={job.id}
							>
								{job.company}
							</button>
						);
					})}
				</div>
				<article className="jobs-info">
					<h3>{title}</h3>
					<h4>{company}</h4>
					{duties.map((duty, index) => {
						return (
							<div key={index} className="job-desc">
								<FaAngleDoubleRight className="job-icon" />
								<p>{duty}</p>
							</div>
						);
					})}
				</article>
			</div>
		</section>
	);
}

export default App;
