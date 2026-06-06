import { useState, useEffect, useContext } from "react";
import { BrowserContext, shouldOpenInBrowser } from "../os/BrowserContext";
import { InBrowserLink } from "../os/InBrowserLink";



function CertificationVerifyLink({ href, children, className, style }: { href: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { openBrowser } = useContext(BrowserContext);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (shouldOpenInBrowser(href)) {
      openBrowser(href);
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <a href={href} className={className} style={style} onClick={handleClick}>
      {children}
    </a>
  );
}

interface Certification {
  name: string;
  org: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  description: string;
  skills: string[];
  color: string;
  logo: string;
}

const aimlCerts: Certification[] = [
  {
    name: "Mastering Machine Learning: From Basics to Advanced",
    org: "CHANDIGARH UNIVERSITY",
    issueDate: "May 2026",
    credentialId: "7LB4WF3FVY0B",
    credentialUrl: "https://coursera.org/verify/7LB4WF3FVY0B/",
    description:
      "Completed an intensive online course covering machine learning fundamentals, data preprocessing, model training, and AI concepts.",
    skills: [
      "Machine Learning",
      "Python",
      "Data Analysis",
      "Artificial Intelligence (AI)",
      "Supervised Learning",
      "Unsupervised Learning",
      "Deep Learning",
      "Model Training",
    ],
    color: "#7c3aed",
    logo: "/logos/chandigarh.svg",
  },
  {
    name: "Generative AI in Action",
    org: "IBM",
    issueDate: "May 2026",
    credentialId: "716e72a6-11ab-4360-8b4c-af92ae3d4f14",
    credentialUrl:
      "https://www.credly.com/badges/716e72a6-11ab-4360-8b4c-af92ae3d4f14",
    description:
      "Completed IBM's Generative AI in Action certification, gaining practical knowledge of Generative AI, prompt engineering, foundation models, and responsible AI practices.",
    skills: [
      "Generative AI",
      "AI Ethics",
      "Prompt Engineering",
      "Responsible AI",
      "Large Language Models (LLMs)",
      "Transformer Models",
    ],
    color: "#2563eb",
    logo: "/logos/ibm.svg",
  },
  {
    name: "Sequence Models",
    org: "DeepLearning.AI",
    issueDate: "November 2025",
    credentialId: "4AEMRQOYWQ96",
    credentialUrl: "https://coursera.org/verify/4AEMRQOYWQ96",
    description:
      "Completed Andrew Ng's Sequence Models course covering RNNs, LSTMs, GRUs, and Transformer architectures.",
    skills: [
      "RNN",
      "LSTM",
      "Transformers",
      "NLP",
      "Sequence Modeling",
      "Deep Learning",
      "TensorFlow",
      "Attention Mechanisms",
    ],
    color: "#0891b2",
    logo: "/logos/deeplearning.svg",
  },
  {
    name: "GenAI for Developers",
    org: "Coursera",
    issueDate: "March 2026",
    credentialId: "IY4MQ2TZPDTO",
    credentialUrl: "https://coursera.org/verify/IY4MQ2TZPDTO",
    description:
      "Completed a hands-on course covering generative AI concepts and practical application development using LLMs.",
    skills: [
      "Generative AI",
      "LLMs",
      "Prompt Engineering",
      "AI Application Development",
      "RAG",
    ],
    color: "#0056d2",
    logo: "/logos/coursera.svg",
  },
  {
    name: "DevOps on AWS Specialization",
    org: "Coursera",
    issueDate: "May 2026",
    credentialId: "DMCP4RVYM1P3",
    credentialUrl: "https://coursera.org/verify/DMCP4RVYM1P3",
    description:
      "Successfully completed the DevOps on AWS Specialization, gaining hands-on knowledge of AWS cloud services and CI/CD pipelines.",
    skills: [
      "DevOps",
      "AWS",
      "CI/CD",
      "CloudFormation",
      "CodePipeline",
      "Infrastructure as Code",
      "Cloud Computing",
    ],
    color: "#ff9900",
    logo: "/logos/coursera.svg",
  },
  {
    name: "AWS Cloud Practitioner Essentials",
    org: "Amazon Web Services (AWS)",
    issueDate: "May 2026",
    credentialId: "8D79F3AVR7",
    credentialUrl:
      "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
    description:
      "Completed the AWS Cloud Practitioner Essentials course covering core AWS services, cloud concepts, security, and architecture.",
    skills: [
      "Cloud Computing",
      "AWS Cloud Fundamentals",
      "Cloud Infrastructure",
      "System Deployment",
    ],
    color: "#ff9900",
    logo: "/logos/aws.svg",
  },
];

const analystCerts: Certification[] = [
  {
    name: "Data Analytics Essentials",
    org: "Cisco",
    issueDate: "May 2026",
    credentialId: "",
    credentialUrl:
      "https://www.credly.com/badges/8169a6a5-ac69-4071-8343-3a1c168a61fa/linked_in_profile",
    description:
      "Successfully completed the Data Analytics Essentials course by Cisco Networking Academy.",
    skills: [
      "Data Analysis",
      "Excel",
      "SQL",
      "Tableau",
      "Dashboard Creation",
      "Data Storytelling",
    ],
    color: "#1BA0D7",
    logo: "/logos/cisco.svg",
  },
  {
    name: "Data Analyst 101 (Powered by Microsoft)",
    org: "Simplilearn",
    issueDate: "May 2026",
    credentialId: "10269773",
    credentialUrl: "https://simpli-web.app.link/e/71rs28Fjr3b",
    description:
      "Completed the Data Analyst 101 program powered by Microsoft through Simplilearn SkillUp.",
    skills: [
      "Data Analytics",
      "SQL",
      "Microsoft Excel",
      "Tableau",
      "Data Visualization",
      "Data Cleaning",
      "Business Intelligence",
    ],
    color: "#2c3e50",
    logo: "/logos/simplilearn.svg",
  },
  {
    name: "Mastering Advanced SQL Queries",
    org: "Coursera",
    issueDate: "May 2026",
    credentialId: "D6OEY1TG78KI",
    credentialUrl: "https://coursera.org/verify/D6OEY1TG78KI",
    description:
      "Completed Coursera certification in Mastering Advanced SQL Queries. Gained strong expertise in SQL joins, subqueries, CTEs, and window functions.",
    skills: [
      "SQL",
      "CTEs",
      "Data Analysis using SQL",
      "Query Optimization",
      "Window Functions",
      "Subqueries",
    ],
    color: "#0056d2",
    logo: "/logos/coursera.svg",
  },
  {
    name: "The Complete AML & KYC Compliance Masterclass",
    org: "Udemy",
    issueDate: "May 2026",
    credentialId: "UC-5ab7abbe-a229-49f7-a5c5-8f5f96ca7f22",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-5ab7abbe-a229-49f7-a5c5-8f5f96ca7f22/",
    description:
      "Successfully completed the AML/KYC/KYB/UBO & Customer Due Diligence (CDD) Compliance Training certification through Udemy.",
    skills: [
      "AML",
      "KYC",
      "Customer Due Diligence (CDD)",
      "KYB",
      "UBO",
      "Transaction Monitoring",
      "Risk Assessment",
    ],
    color: "#a435f0",
    logo: "/logos/udemy.svg",
  },
];

function OrgLogo({
  src,
  fallbackInitials,
  fallbackColor,
}: {
  src: string;
  fallbackInitials: string;
  fallbackColor: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
        style={{
          background: `${fallbackColor}20`,
          border: `1px solid ${fallbackColor}40`,
        }}
      >
        <span
          className="text-[10px] font-bold"
          style={{ color: fallbackColor }}
        >
          {fallbackInitials}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      className="w-8 h-8 rounded-md object-contain shrink-0 bg-white border border-[#E8D5B0]"
      onError={() => setErrored(true)}
    />
  );
}

export default function CertificationsWindow({
  profile,
}: {
  profile: "aiml" | "analyst";
}) {
  const [expandedCert, setExpandedCert] = useState<number | null>(null);

  const certs = profile === "aiml" ? aimlCerts : analystCerts;
  const sectionTitle = profile === "aiml" ? "AI/ML & Cloud" : "Data Analytics";
  const totalVerified = certs.length;

  const getInitials = (org: string) =>
    org
      .split(/[\s/]+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const toggleExpand = (idx: number) => {
    setExpandedCert((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="h-full flex flex-col bg-[#FFFDF7]">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[#E8D5B0] shrink-0 bg-[#FFFDF7]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-[10px] text-[#E8832A] font-bold tracking-wide">
              {sectionTitle} CERTIFICATIONS
            </h2>
            <p className="text-[8px] text-[#8B6F47] mt-0.5">
              {totalVerified} verified credentials
            </p>
          </div>
          <div className="px-2 py-1 bg-[#E8832A] text-white rounded-md">
            <span className="font-display text-[9px] font-bold">
              {totalVerified}
            </span>
          </div>
        </div>
      </div>

      {/* Cert List */}
      <div className="flex-1 overflow-y-auto p-2 os-scrollbar">
        <div className="space-y-1.5">
          {certs.map((cert, idx) => {
            const isExpanded = expandedCert === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E8D5B0] rounded-lg overflow-hidden hover:border-[#E8832A]/50 transition-colors"
              >
                <div
                  className="flex items-start gap-2 p-2.5 cursor-pointer"
                  onClick={() => toggleExpand(idx)}
                >
                  {/* Logo */}
                  <OrgLogo
                    src={cert.logo}
                    fallbackInitials={getInitials(cert.org)}
                    fallbackColor={cert.color}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                      <span
                        className="font-display text-[7px] px-1.5 py-0.5 rounded-full font-medium"
                        style={{
                          background: `${cert.color}15`,
                          color: cert.color,
                          border: `1px solid ${cert.color}30`,
                        }}
                      >
                        {cert.org}
                      </span>
                      <span className="text-[7px] text-[#8B6F47]">•</span>
                      <span className="text-[7px] text-[#8B6F47]">
                        {cert.issueDate}
                      </span>
                    </div>

                    <h3 className="text-[10px] font-semibold text-[#3D2B1F] leading-tight mb-1">
                      {cert.name}
                    </h3>

                    <div className="flex flex-wrap gap-1">
                      {cert.skills
                        .slice(0, isExpanded ? cert.skills.length : 3)
                        .map((skill, i) => (
                          <span
                            key={i}
                            className="text-[7px] px-1.5 py-0.5 rounded bg-[#F5E6C8] text-[#6B5B3D] border border-[#E8D5B0]"
                          >
                            {skill}
                          </span>
                        ))}
                      {!isExpanded && cert.skills.length > 3 && (
                        <span className="text-[7px] px-1.5 py-0.5 rounded bg-[#F5E6C8]/50 text-[#8B6F47]">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expand arrow */}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`text-[#8B6F47] transition-transform duration-200 shrink-0 mt-1 ${isExpanded ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div
                    className="px-2.5 pb-2.5 pt-1 border-t border-[#E8D5B0] bg-[#FCF3DE]/50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="text-[8px] text-[#6B5B3D] leading-relaxed mb-2">
                      {cert.description}
                    </p>

                    <div className="flex items-center gap-2 mb-2 text-[7px] text-[#8B6F47]">
                      <span className="font-medium">ID:</span>
                      <span className="font-mono">
                        {cert.credentialId || "N/A"}
                      </span>
                    </div>

                    <InBrowserLink
                      href={cert.credentialUrl}
                      className="inline-flex items-center gap-1 px-2 py-1 text-[8px] font-semibold text-white bg-[#E8832A] rounded hover:bg-[#d4722a] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                       Verify
                     </InBrowserLink>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
