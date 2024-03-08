// Sample job data interface
interface Job {
    title: string;
    company: string;
    location: string;
}

//Les differents jobs
const jobData: Job[] = [
    { title: 'Software Engineer', company: 'TechCorp', location: 'New York' },
    { title: 'Data Analyst', company: 'DataCo', location: 'San Francisco' },
    { title: 'Marketing Specialist', company: 'MarketX', location: 'Los Angeles' },
    //ajouter des jobs
];

// Fonction pour afficher les job
function displayJobOffers(jobs: Job[]) {
    const jobContainer = document.getElementById('jobOffers');
    if (!jobContainer) return;

    jobContainer.innerHTML = '';

    jobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('jobOffer');
        jobElement.innerHTML = `
            <h2>${job.title}</h2>
            <p><strong>Companie</strong> ${job.company}</p>
            <p><strong>Lieu:</strong> ${job.location}</p>
        `;
        jobContainer.appendChild(jobElement);
    });
}

// Fonction pour filtrer les offres d'emploi
function filterJobs(searchText: string) {
    const filteredJobs = jobData.filter(job =>
        job.title.toLowerCase().includes(searchText.toLowerCase()) ||
        job.company.toLowerCase().includes(searchText.toLowerCase()) ||
        job.location.toLowerCase().includes(searchText.toLowerCase())
    );
    displayJobOffers(filteredJobs);
}

// offre d<emploi avant le filtre
displayJobOffers(jobData);

// Event listener pour les search input
const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
if (searchInput) {
    searchInput.addEventListener('input', function () {
        filterJobs(this.value);
    });
}