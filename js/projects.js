/* ============================================================
   PROJECTS — this is the file you edit to add work.

   To add a project: copy any block below, paste it into the array, edit it.
   Save. No build step, no other file to touch.

   ── IMAGES ────────────────────────────────────────────────
   Use `images:` (plural). One, several, or none:

     images: []                          → draws its own topology artwork
     images: ['img/projects/a.jpg']      → one image, no dots
     images: ['a.jpg', 'b.jpg', 'c.jpg'] → dots appear automatically

   Put the STRONGEST screenshot first — that's the one people see without
   clicking anything. Add as many as you like; the dots are generated.

   Plain strings work, but the object form lets you write proper alt text,
   which is what screen readers and Google actually read:

     images: [{ src: 'img/projects/a.jpg', alt: 'What is happening here' }]

   Save files to img/projects/ at ~1400px wide. They're cropped from the top,
   so keep the important part high in the frame.

   ── OTHER FIELDS ──────────────────────────────────────────
   `video:` is optional — adds a "Watch demo" link next to "View source".
   `tags:`  drives the filter buttons. A new tag makes a new button.
   `featured: true` makes the card double-width. Use it on one project only.
   ============================================================ */

const PROJECTS = [
  {
    slug: 'airwatch',
    title: 'AirWatch',
    kicker: 'Final year project · Raspberry Pi 5',
    blurb:
      'An indoor air quality monitor I built on a Raspberry Pi 5. A Sensirion SEN54 ' +
      'sensor reads PM2.5, VOC, temperature and humidity every two seconds. The ' +
      'readings go through Kafka into PostgreSQL, get scored using the US EPA air ' +
      'quality formula, and show up on a React dashboard with live charts and a ' +
      '48-hour forecast.',
    stack: ['Raspberry Pi 5', 'Kafka', 'PostgreSQL', 'FastAPI', 'React', 'Docker', 'nginx'],
    tags: ['homelab', 'cloud'],
    images: [
      { src: 'img/projects/airwatch.jpg',
        alt: 'The AirWatch dashboard reading AQI 121, with live PM2.5, VOC, ' +
             'temperature and humidity tiles and 24-hour charts' },
      { src: 'img/projects/airwatch2.jpg',
        alt: 'An automated AirWatch email alert arriving in Gmail when air ' +
             'quality passed AQI 101' }
    ],
    repo: 'https://github.com/PradipShrees/AirWatch',
    video: 'https://www.facebook.com/share/v/19JmyAhNnL/',
    featured: true
  },

  {
    slug: 'overwatch',
    title: 'OverWatch',
    kicker: 'Final year project · ICT301',
    blurb:
      'A face recognition system for controlled entry points. A Pi camera tracks ' +
      'people in frame, picks the clearest shot of each face, uploads it to S3 and ' +
      'checks it against a set of known faces using AWS Rekognition. If it finds a ' +
      'match it sends an alert through SNS. It runs without a monitor, and keeps ' +
      'working locally if AWS can’t be reached.',
    stack: ['Raspberry Pi', 'OpenCV', 'Rekognition', 'S3', 'SNS', 'Python'],
    tags: ['homelab', 'cloud'],
    images: [
      { src: 'img/projects/overwatch2.jpg',
        alt: 'OverWatch running live: terminal logs re-identifying a tracked ' +
             'person while the camera feed draws a detection box around a face' },
      // Concept render rather than a real capture — consider removing it.
      { src: 'img/projects/overwatch-concept.jpg',
        alt: 'Diagram of the OverWatch setup: a Raspberry Pi and camera module ' +
             'matching faces against a cloud collection' }
    ],
    repo: 'https://github.com/PradipShrees/Overwatch'
  },

  {
    slug: 'aws-alb-asg',
    title: 'Load Balancing & Auto Scaling',
    kicker: 'AWS lab · Sydney region',
    blurb:
      'I put an Application Load Balancer in front of an Auto Scaling group spread ' +
      'across three availability zones, then shut down an instance on purpose to see ' +
      'whether the group noticed and replaced it. It did. Covers launch templates, ' +
      'target groups and health checks.',
    stack: ['ALB', 'EC2 Auto Scaling', 'Target Groups', 'Launch Templates', 'Multi-AZ'],
    tags: ['networking', 'cloud'],
    images: [
      { src: 'img/projects/aws-alb-asg.jpg',
        alt: 'The AWS console showing an Application Load Balancer with four ' +
             'healthy targets across three availability zones' }
    ],
    repo: 'https://github.com/PradipShrees/Aws-Labs-and-Documentation/tree/main/alb-asg-lab'
  },

  {
    slug: 'aws-vpc',
    title: 'VPC Networking',
    kicker: 'AWS lab · built from scratch',
    blurb:
      'An AWS network built from the ground up: public and private subnets, route ' +
      'tables, an internet gateway and a NAT gateway. It also covers reaching a ' +
      'private database through a bastion host, and using a VPC endpoint so that ' +
      'traffic never travels over the public internet.',
    stack: ['VPC', 'Subnets', 'Route Tables', 'NAT / IGW', 'Bastion', 'VPC Endpoints'],
    tags: ['networking', 'cloud'],
    images: [],   // add 'img/projects/aws-vpc.jpg' when you screenshot the VPC map
    repo: 'https://github.com/PradipShrees/Aws-Labs-and-Documentation/tree/main/vpc-lab'
  },

  {
    slug: 'pihole-dns',
    title: 'Pi-hole DNS Sinkhole',
    kicker: 'Homelab · whole house',
    blurb:
      'A Pi-hole DNS server running on a Raspberry Pi 5 that blocks ads and trackers ' +
      'for every device in the house. I pointed the router’s DNS at it, tuned the ' +
      'blocklists, and measured the difference before and after — about 81,000 domains ' +
      'blocked, and roughly a fifth of all DNS requests stopped.',
    stack: ['Raspberry Pi 5', 'Pi-hole', 'DNS', 'Linux', 'Router config'],
    tags: ['networking', 'homelab'],
    images: [
      { src: 'img/projects/pihole-dns.jpg',
        alt: 'The Pi-hole dashboard showing 1,145 queries with 20.9% blocked ' +
             'and 81,273 domains on the blocklist' }
    ],
    repo: 'https://github.com/PradipShrees/Linux-Ubuntu-Labs/tree/main/Pi-Hole-Lab'
  }
];

/* Filter button labels. A tag with no entry here falls back to the raw tag name.
   The order here is the order the buttons appear in. */
const TAG_LABELS = {
  networking: 'Networking',
  cloud: 'Cloud',
  homelab: 'Homelab'
};
