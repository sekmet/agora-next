import {
  ParsedProposalData,
  ProposalStatus,
  ParsedProposalResults,
} from "@/lib/proposalUtils";
import { OptimismProposals, ProposalType } from "@prisma/client";
import { BigNumberish } from "ethers";

export type ProposalPayload = OptimismProposals;

export type Proposal = {
  id: string;
  proposer: string;
  snapshotBlockNumber: number;
  created_time: Date | null;
  start_time: Date | null;
  end_time: Date | null;
  cancelled_time: Date | null;
  markdowntitle: string;
  description: string | null;
  quorum: BigNumberish | null;
  approvalThreshold: BigNumberish | null;
  proposalData: ParsedProposalData[ProposalType]["kind"];
  unformattedProposalData: `0x${string}` | null | any;
  proposalResults: ParsedProposalResults[ProposalType]["kind"];
  proposalType: ProposalType | null;
  status: ProposalStatus | null;
  created_transaction_hash: string | null;
  cancelled_transaction_hash: string | null;
  executed_transaction_hash: string | null;
};
