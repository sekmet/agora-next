import { HStack, VStack } from "@/components/Layout/Stack";
import ProposalDescription from "../ProposalDescription/ProposalDescription";
import styles from "./OPProposalApprovalPage.module.scss";
import ApprovalVotesPanel from "./ApprovalVotesPanel/ApprovalVotesPanel";
import {
  getVoteForProposalAndDelegate,
  getVotesForProposal,
} from "@/app/api/votes/getVotes";
import { getVotingPowerAtSnapshot } from "@/app/api/voting-power/getVotingPower";
import { getAuthorityChains } from "@/app/api/authority-chains/getAuthorityChains";
import { getDelegate } from "@/app/api/delegates/getDelegates";
import { Proposal } from "@/app/api/proposals/proposal";

async function fetchProposalVotes(proposal_id: string, page = 1) {
  "use server";

  return getVotesForProposal({ proposal_id, page });
}

async function fetchVotingPower(
  addressOrENSName: string | `0x${string}`,
  blockNumber: number
) {
  "use server";

  return {
    votingPower: (
      await getVotingPowerAtSnapshot({ blockNumber, addressOrENSName })
    ).totalVP,
  };
}

async function fetchAuthorityChains(
  address: string | `0x${string}`,
  blockNumber: number
) {
  "use server";

  return {
    chains: await getAuthorityChains({
      blockNumber,
      address,
    }),
  };
}

async function fetchDelegate(addressOrENSName: string | `0x${string}`) {
  "use server";

  return await getDelegate({
    addressOrENSName,
  });
}

async function fetchVoteForProposalAndDelegate(
  proposal_id: string,
  address: string | `0x${string}`
) {
  "use server";

  return await getVoteForProposalAndDelegate({
    proposal_id,
    address,
  });
}

export default async function OPProposalApprovalPage({
  proposal,
}: {
  proposal: Proposal;
}) {
  const proposalVotes = await fetchProposalVotes(proposal.id);

  return (
    // 2 Colum Layout: Description on left w/ transactions and Votes / voting on the right
    <HStack
      gap={16}
      justifyContent="justify-between"
      alignItems="items-start"
      className={styles.proposal_container}
    >
      <ProposalDescription proposal={proposal} />
      <VStack
        gap={4}
        justifyContent="justify-between"
        className={styles.proposal_votes_container}
      >
        <VStack gap={4} className={styles.proposal_actions_panel}>
          {/* Show the results of the approval vote w/ a tab for votes */}
          <ApprovalVotesPanel
            proposal={proposal}
            initialProposalVotes={proposalVotes}
            fetchVotesForProposal={fetchProposalVotes}
            fetchVotingPower={fetchVotingPower}
            fetchAuthorityChains={fetchAuthorityChains}
            fetchDelegate={fetchDelegate}
            fetchVoteForProposalAndDelegate={fetchVoteForProposalAndDelegate}
          />
        </VStack>
      </VStack>
    </HStack>
  );
}