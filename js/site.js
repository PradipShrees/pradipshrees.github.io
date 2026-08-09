const SITE = {
  links: {
    email: 'pradipshrees0@gmail.com',
    github: 'https://github.com/PradipShrees',
    linkedin: 'https://www.linkedin.com/in/pradip-shrees-776b612a1/',
    journal: 'https://github.com/PradipShrees/Python-Journey'
  },

  /* Grouped by the three areas you're applying into. Each group points at the
     project on this page that shows it in practice. */
  capabilities: [
    {
      area: 'Networking',
      proof: 'pihole-dns',
      proofLabel: 'Pi-hole DNS Sinkhole',
      items: [
        'DNS and DHCP', 'Subnetting and VLANs', 'Router and firewall config',
        'VPC design', 'Load balancing', 'Network troubleshooting'
      ]
    },
    {
      area: 'Cloud',
      proof: 'aws-alb-asg',
      proofLabel: 'Load Balancing & Auto Scaling',
      items: [
        'EC2, VPC, S3, IAM', 'Auto Scaling and ALB', 'Rekognition and SNS',
        'Multi-AZ setups', 'Bastion hosts and endpoints', 'Keeping costs down'
      ]
    },
    {
      area: 'Linux & Systems',
      proof: 'airwatch',
      proofLabel: 'AirWatch',
      items: [
        'Ubuntu and Debian', 'systemd services', 'Docker and Compose',
        'nginx and TLS', 'Bash and Python', 'Raspberry Pi setups'
      ]
    }
  ],

  /* Nothing here is finished yet — every entry says so, and each links to
     work already done toward it. Don't change a status until the
     certificate is actually in hand. */
  certifications: [
    {
      name: 'Cisco CCNA',
      full: 'Cisco Certified Network Associate',
      status: 'In progress',
      note: 'Studying routing and switching, subnetting, and how to track down ' +
            'problems on a network. I practise on the hardware in my homelab as ' +
            'well as in Packet Tracer.',
      proof: 'pihole-dns',
      proofLabel: 'See the DNS lab'
    },
    {
      name: 'AWS SAA',
      full: 'AWS Solutions Architect – Associate',
      status: 'In progress',
      note: 'Studying VPC design, high availability and scaling. The AWS labs on ' +
            'this page are part of how I’m preparing for it.',
      proof: 'aws-alb-asg',
      proofLabel: 'See the AWS labs'
    }
  ],

  education: [
    {
      degree: 'Master of Networking',
      // TODO: add the institution name once your enrolment is confirmed.
      school: '',
      dates: 'Starting soon',
      status: 'upcoming',
      note: 'I want to go deeper into routing, switching and network design.'
    },
    {
      degree: 'Bachelor of Information Technology',
      major: 'Major in Digital Enterprise',
      school: 'Sydney International School of Technology and Commerce',
      dates: 'Jul 2023 – Jun 2026',
      status: 'complete',
      note: 'Finished in June 2026 and graduating in September. My final year ' +
            'projects were AirWatch and Overwatch, both on this page.'
    }
  ]
};
